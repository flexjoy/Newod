package flexjoy.newod.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Sergey Cherepanov on 05.04.2016
 */

@Controller
public class RootController {

	@RequestMapping("/")
	public String index() {
		return "index";
	}
}
