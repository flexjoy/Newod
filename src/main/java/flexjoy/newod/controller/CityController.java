package flexjoy.newod.controller;

import flexjoy.newod.domain.City;
import flexjoy.newod.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author Sergey Cherepanov on 01.05.2016.
 */

@RestController
@RequestMapping("/api")
public class CityController {

	@Autowired
	private CityRepository cityRepository;

	@RequestMapping(value = "/cities", method = RequestMethod.GET)
	public Page<City> findPage(Pageable pageable, @RequestParam String search) {
		if (search.isEmpty()) {
			return cityRepository.findAll(pageable);
		} else {
			return cityRepository.findByNameStartsWithIgnoreCase(search, pageable);
		}
	}

	@RequestMapping(value = "/cities", method = RequestMethod.POST)
	public City add(@Valid @RequestBody City city) {
		return cityRepository.save(city);
	}

	@RequestMapping(value = "/cities/{id}", method = RequestMethod.GET)
	public City findOne(@PathVariable("id") int id) {
		return cityRepository.findOne(id);
	}

	@RequestMapping(value = "/cities/{id}", method = RequestMethod.PUT)
	public City update(@PathVariable("id") int id, @Valid @RequestBody City city) {
		return cityRepository.save(city);
	}

	@RequestMapping(value = "/cities/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		cityRepository.delete(id);
	}
}
