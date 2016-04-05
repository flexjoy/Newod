package flexjoy.newod;

import com.jayway.restassured.RestAssured;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

@WebAppConfiguration
@IntegrationTest("server.port:0")
public abstract class AbstractRestControllerTest extends AbstractTest{

	@Value("${local.server.port}")
	private int serverPort;

	protected void setUp() {
		RestAssured.port = serverPort;
	}
}
