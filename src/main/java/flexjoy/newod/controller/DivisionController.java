package flexjoy.newod.controller;

import flexjoy.newod.domain.Division;
import flexjoy.newod.repository.DivisionRepository;
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
 * @author Sergey Cherepanov on 01.04.2016
 */

@RestController
@RequestMapping("/api/divisions")
public class DivisionController {

	@Autowired
	private DivisionRepository divisionRepository;

	/**
	 * Get all divisions without pagination.
	 * @return divisions list
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Division> findAll() {
		Sort sort = new Sort(Sort.Direction.ASC, "name");
		return divisionRepository.findAll(sort);
	}

	@RequestMapping(method = RequestMethod.GET)
	public Page<Division> findPage(Pageable pageable, @And({
			@Spec(path = "name", spec = Like.class),
			@Spec(path = "enabled", spec = Equal.class)}) Specification spec) {
		return divisionRepository.findAll(spec, pageable);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Division add(@Valid @RequestBody Division division) {
		return divisionRepository.save(division);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Division findOne(@PathVariable("id") int id) {
		return divisionRepository.findOne(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Division update(@PathVariable("id") int id, @Valid @RequestBody Division division) {
		return divisionRepository.save(division);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		divisionRepository.delete(id);
	}
}
