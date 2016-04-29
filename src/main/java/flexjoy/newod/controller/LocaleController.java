package flexjoy.newod.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;

/**
 * @author Sergey Cherepanov on 29.04.2016.
 */

@Controller
public class LocaleController {

	@Autowired
	private LocaleResolver resolver;

	@RequestMapping(value = "/locale/{locale}", method = RequestMethod.GET)
	public void setLocale(@PathVariable("locale") String locale,
						  HttpServletRequest request,
						  HttpServletResponse response) {
		resolver.setLocale(request, response, new Locale(locale));
	}
}
