package flexjoy.newod.controller;

import flexjoy.newod.domain.Division;
import flexjoy.newod.repository.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

@RestController
@RequestMapping("/api")
public class DivisionController {

	@Autowired
	private DivisionRepository divisionRepository;

	@RequestMapping(value = "/divisions", method = RequestMethod.GET)
	public Page<Division> findAll(Pageable pageable) {
		return divisionRepository.findAll(pageable);
	}

	@RequestMapping(value = "/divisions", method = RequestMethod.POST)
	public Division add(@Valid @RequestBody Division division) {
		return divisionRepository.save(division);
	}

	@RequestMapping(value = "/divisions/{id}", method = RequestMethod.GET)
	public Division findOne(@PathVariable("id") int id) {
		return divisionRepository.findOne(id);
	}

	@RequestMapping(value = "/divisions/{id}", method = RequestMethod.PUT)
	public Division update(@PathVariable("id") int id, @Valid @RequestBody Division division) {
		return divisionRepository.save(division);
	}

	@RequestMapping(value = "/divisions/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		divisionRepository.delete(id);
	}
}
