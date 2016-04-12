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

public class DivisionRestControllerTest extends AbstractRestControllerTest {

	private static final String FIRST_ITEM_NAME = "FIRST_ITEM_NAME";
	private static final String SECOND_ITEM_NAME = "SECOND_ITEM_NAME";
	private static final String THIRD_ITEM_NAME = "THIRD_ITEM_NAME";
	private static final boolean THIRD_ITEM_ENABLED = false;

	@Autowired
	private DivisionRepository repo;
	private Division firstItem = new Division(FIRST_ITEM_NAME);
	private Division secondItem = new Division(SECOND_ITEM_NAME);
	private Division thirdItem = new Division(THIRD_ITEM_NAME);

	@Before
	public void setUp() {
		super.setUp();

		repo.deleteAll();
		repo.save(firstItem);
		repo.save(secondItem);
	}

	@Test
	public void findAll() throws Exception {
		when().
				get("/division").
		then().
				statusCode(HttpStatus.SC_OK).
				body("id", hasSize(2)).
				body("name", hasItems(FIRST_ITEM_NAME, SECOND_ITEM_NAME));
	}

	@Test
	public void add() throws Exception {
		given().
				body(thirdItem).
				contentType(ContentType.JSON).
		when().
				post("/division").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(THIRD_ITEM_NAME)).
				body("enabled", equalTo(true));
	}

	@Test
	public void update() throws Exception {
		firstItem.setName(THIRD_ITEM_NAME);
		firstItem.setEnabled(THIRD_ITEM_ENABLED);

		given().
				queryParam("id", firstItem.getId()).
				body(firstItem).
				contentType(ContentType.JSON).
		when().
				post("/division").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(THIRD_ITEM_NAME)).
				body("enabled", equalTo(THIRD_ITEM_ENABLED));
	}
}
