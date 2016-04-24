package flexjoy.newod.controller;

import flexjoy.newod.domain.Division;
import flexjoy.newod.repository.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

@RestController
@RequestMapping("/api")
public class DivisionController {

	@Autowired
	private DivisionRepository divisionRepository;

	@RequestMapping("/divisions")
	public Page<Division> findAll(Pageable pageable) {
		return divisionRepository.findAll(pageable);
	}
}
