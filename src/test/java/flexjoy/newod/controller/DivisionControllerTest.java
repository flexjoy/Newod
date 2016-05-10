package flexjoy.newod.controller;

import com.jayway.restassured.http.ContentType;
import flexjoy.newod.AbstractRestControllerTest;
import flexjoy.newod.domain.Division;
import flexjoy.newod.repository.DivisionRepository;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.jayway.restassured.RestAssured.given;
import static com.jayway.restassured.RestAssured.when;
import static org.hamcrest.Matchers.*;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

public class DivisionControllerTest extends AbstractRestControllerTest {

	private static final String FIRST_ITEM_NAME = "first";
	private static final String SECOND_ITEM_NAME = "second";
	private static final String THIRD_ITEM_NAME = "third";
	private static final boolean THIRD_ITEM_ENABLED = false;

	@Autowired
	private DivisionRepository divisionRepository;
	private Division firstItem = new Division(FIRST_ITEM_NAME);
	private Division secondItem = new Division(SECOND_ITEM_NAME);
	private Division thirdItem = new Division(THIRD_ITEM_NAME);

	@Before
	public void setUp() {
		super.setUp();

		divisionRepository.deleteAll();
		divisionRepository.save(firstItem);
		divisionRepository.save(secondItem);
	}

	@Test
	public void findAll() throws Exception {
		when().
				get("/api/divisions/all").
		then().
				statusCode(HttpStatus.SC_OK).
				body("id", hasSize(2)).
				body("name", hasItems(FIRST_ITEM_NAME, SECOND_ITEM_NAME));
	}

	@Test
	public void findPage() throws Exception {
		when().
				get("/api/divisions").
		then().
				statusCode(HttpStatus.SC_OK).
				body("content.id", hasSize(2)).
				body("content.name", hasItems(FIRST_ITEM_NAME, SECOND_ITEM_NAME));
	}

	@Test
	public void add() throws Exception {
		given().
				body(thirdItem).
				contentType(ContentType.JSON).
		when().
				post("/api/divisions").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(THIRD_ITEM_NAME)).
				body("enabled", equalTo(true));
	}

	@Test
	public void findOne() throws Exception {
		given().
				pathParam("id", firstItem.getId()).
		when().
				get("/api/divisions/{id}").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(FIRST_ITEM_NAME)).
				body("enabled", equalTo(true));
	}

	@Test
	public void update() throws Exception {
		firstItem.setName(THIRD_ITEM_NAME);
		firstItem.setEnabled(THIRD_ITEM_ENABLED);

		given().
				pathParam("id", firstItem.getId()).
				body(firstItem).
				contentType(ContentType.JSON).
		when().
				put("/api/divisions/{id}").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(THIRD_ITEM_NAME)).
				body("enabled", equalTo(THIRD_ITEM_ENABLED));
	}

	@Test
	public void delete() throws Exception {
		given().
				pathParam("id", firstItem.getId()).
		when().
				delete("/api/divisions/{id}").
		then().
				statusCode(HttpStatus.SC_OK);
	}
}
