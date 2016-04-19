package flexjoy.newod.controller;

import flexjoy.newod.domain.Store;
import flexjoy.newod.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Sergey Cherepanov on 19.04.2016.
 */

@RestController
@RequestMapping("store")
public class StoreController {

	@Autowired
	private StoreRepository repo;

	@RequestMapping("/{id}")
	public Store store(@PathVariable("id") int id) {
		return repo.findOne(id);
	}
}
