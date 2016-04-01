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

    @Autowired
    private DivisionRepository repo;
    private Division firstItem = new Division("111");
    private Division secondItem = new Division("222");
    private Division thirdItem = new Division("333");

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
                get("/divisions").
        then().
                statusCode(HttpStatus.SC_OK).
                body("id", hasSize(2)).
                body(
                        "name",
                        hasItems(
                                firstItem.getName(),
                                secondItem.getName()
                        )
                );
    }

    @Test
    public void add() throws Exception {
        given().
                body(thirdItem).
                contentType(ContentType.JSON).
        when().
                post("/divisions").
        then().
                statusCode(HttpStatus.SC_OK).
                body(
                        "name",
                        equalTo(thirdItem.getName())
                ).
                body("enabled", equalTo(true));
    }

    @Test
    public void update() throws Exception {
        firstItem.setName("444");
        firstItem.setEnabled(false);

        given().
                queryParam("id", firstItem.getId()).
                body(firstItem).
                contentType(ContentType.JSON).
        when().
                post("/divisions").
        then().
                statusCode(HttpStatus.SC_OK).
                body(
                        "name",
                        equalTo(firstItem.getName())
                ).
                body(
                        "enabled",
                        equalTo(firstItem.isEnabled())
                );
    }
}
