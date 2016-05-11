package flexjoy.newod.controller;

import com.jayway.restassured.http.ContentType;
import flexjoy.newod.AbstractRestControllerTest;
import flexjoy.newod.domain.City;
import flexjoy.newod.domain.Division;
import flexjoy.newod.repository.CityRepository;
import flexjoy.newod.repository.DivisionRepository;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.jayway.restassured.RestAssured.given;
import static com.jayway.restassured.RestAssured.when;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItems;
import static org.hamcrest.Matchers.hasSize;

/**
 * @author Sergey Cherepanov on 11.05.2016.
 */
public class CityControllerTest extends AbstractRestControllerTest {

	private static final String DIVISION_NAME = "division";
	private static final String FIRST_ITEM_NAME = "first";
	private static final String SECOND_ITEM_NAME = "second";
	private static final String THIRD_ITEM_NAME = "third";
	private static final boolean THIRD_ITEM_ENABLED = false;

	@Autowired
	private DivisionRepository divisionRepository;

	@Autowired
	private CityRepository cityRepository;

	private Division division = new Division(DIVISION_NAME);
	private City firstItem,	secondItem, thirdItem;

	@Before
	public void setUp() {
		super.setUp();

		Division div = divisionRepository.save(division);
		firstItem = new City(FIRST_ITEM_NAME, div);
		secondItem = new City(SECOND_ITEM_NAME, div);
		thirdItem = new City(THIRD_ITEM_NAME, div);

		cityRepository.deleteAll();
		cityRepository.save(firstItem);
		cityRepository.save(secondItem);
	}

	@Test
	public void findPage() throws Exception {
		when().
				get("/api/cities").
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
				post("/api/cities").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(THIRD_ITEM_NAME)).
				body("enabled", equalTo(true)).
				body("division.name", equalTo(DIVISION_NAME));
	}

	@Test
	public void findOne() throws Exception {
		given().
				pathParam("id", firstItem.getId()).
		when().
				get("/api/cities/{id}").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(FIRST_ITEM_NAME)).
				body("enabled", equalTo(true)).
				body("division.name", equalTo(DIVISION_NAME));
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
				put("/api/cities/{id}").
		then().
				statusCode(HttpStatus.SC_OK).
				body("name", equalTo(THIRD_ITEM_NAME)).
				body("enabled", equalTo(THIRD_ITEM_ENABLED)).
				body("division.name", equalTo(DIVISION_NAME));
	}

	@Test
	public void delete() throws Exception {
		given().
				pathParam("id", firstItem.getId()).
		when().
				delete("/api/cities/{id}").
		then().
				statusCode(HttpStatus.SC_OK);
	}
}
