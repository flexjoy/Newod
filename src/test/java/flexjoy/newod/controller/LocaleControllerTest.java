package flexjoy.newod.controller;

import flexjoy.newod.AbstractRestControllerTest;
import org.apache.http.HttpStatus;
import org.junit.Before;
import org.junit.Test;

import static com.jayway.restassured.RestAssured.given;

/**
 * @author Sergey Cherepanov on 10.05.2016.
 */
public class LocaleControllerTest extends AbstractRestControllerTest {

	@Before
	public void setUp() {
		super.setUp();
	}

	@Test
	public void setRuLocale() throws Exception {

		given().
				pathParam("locale", "ru").
		when().
				get("/locale/{locale}").
		then().
				statusCode(HttpStatus.SC_OK).
				cookie("BACKEND_LOCALE", "ru");
	}

	@Test
	public void setEnLocale() throws Exception {

		given().
				pathParam("locale", "en").
		when().
				get("/locale/{locale}").
		then().
				statusCode(HttpStatus.SC_OK).
				cookie("BACKEND_LOCALE", "en");
	}
}
