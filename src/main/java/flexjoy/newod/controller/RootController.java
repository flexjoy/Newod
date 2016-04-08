package flexjoy.newod.controller;

import flexjoy.newod.repository.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Sergey Cherepanov on 05.04.2016
 */

@Controller
public class RootController {

	@Autowired
	private DivisionRepository repo;

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@RequestMapping("home")
	public String home() {
		return "partials/home";
	}

	@RequestMapping("store-select")
	public String stores(Model model) {
		model.addAttribute("divisions", repo.findAll());
		return "partials/store-select";
	}
}
