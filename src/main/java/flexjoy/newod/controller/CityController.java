package flexjoy.newod.controller;

import flexjoy.newod.domain.City;
import flexjoy.newod.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Sergey Cherepanov on 18.04.2016.
 */

@RestController
@RequestMapping("city")
public class CityController {

	@Autowired
	private CityRepository repo;

	@RequestMapping(method = RequestMethod.GET)
	public List<City> findAll() {
		return repo.findAll(new Sort(Sort.Direction.ASC, "name"));
	}
}
