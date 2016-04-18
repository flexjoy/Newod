package flexjoy.newod.controller;

import flexjoy.newod.domain.City;
import flexjoy.newod.repository.CityRepository;
import flexjoy.newod.repository.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Sergey Cherepanov on 12.04.2016.
 */

@RestController
@RequestMapping("division/{division_id}/city")
public class CityByDivisionController {

	@Autowired
	private DivisionRepository divisionRepository;

	@Autowired
	private CityRepository cityRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<City> findByDivision_id(
			@PathVariable("division_id") int division_id) {
		return cityRepository.findByDivision_id(division_id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public City add(
			@PathVariable("division_id") int division_id,
			@Valid @RequestBody City city) {
		city.setDivision(divisionRepository.findOne(division_id));
		return cityRepository.save(city);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public City update(
			@PathVariable("division_id") int division_id,
			@PathVariable("id") int id,
			@Valid @RequestBody City city) {
		city.setId(id);
		city.setDivision(divisionRepository.findOne(division_id));
		return cityRepository.save(city);
	}
}
