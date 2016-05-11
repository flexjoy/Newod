package flexjoy.newod.controller;

import flexjoy.newod.domain.City;
import flexjoy.newod.repository.CityRepository;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Sergey Cherepanov on 01.05.2016.
 */

@RestController
@RequestMapping("/api/cities")
public class CityController {

	@Autowired
	private CityRepository cityRepository;

	/**
	 * Get all cities sort by 'name' without pagination.
	 * @return cities list
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<City> findAll() {
		Sort sort = new Sort(Sort.Direction.ASC, "name");
		return cityRepository.findAll(sort);
	}

	@RequestMapping(method = RequestMethod.GET)
	public Page<City> findPage(Pageable pageable, @And({
			@Spec(path = "name", spec = Like.class),
			@Spec(path = "enabled", spec = Equal.class),
			@Spec(path = "division.id", params = "division", spec = Equal.class)}) Specification spec) {
		return cityRepository.findAll(spec, pageable);
	}

	@RequestMapping(method = RequestMethod.POST)
	public City add(@Valid @RequestBody City city) {
		return cityRepository.save(city);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public City findOne(@PathVariable("id") int id) {
		return cityRepository.findOne(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public City update(@PathVariable("id") int id, @Valid @RequestBody City city) {
		return cityRepository.save(city);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		cityRepository.delete(id);
	}
}
