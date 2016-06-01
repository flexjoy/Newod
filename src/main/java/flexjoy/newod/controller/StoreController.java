package flexjoy.newod.controller;

import flexjoy.newod.domain.Store;
import flexjoy.newod.repository.StoreRepository;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Sergey Cherepanov on 11.05.2016.
 */

@RestController
@RequestMapping("/api/stores")
public class StoreController {

	@Autowired
	private StoreRepository storeRepository;

	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public List<Store> findAll(@RequestParam("city") int id) {
		return storeRepository.findByCityId(id);
	}

	@RequestMapping(method = RequestMethod.GET)
	public Page<Store> findPage(Pageable pageable, @And({
			@Spec(path = "name", spec = Like.class),
			@Spec(path = "enabled", spec = Equal.class),
			@Spec(path = "city.id", params = "city", spec = Equal.class)}) Specification spec) {
		return storeRepository.findAll(spec, pageable);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Store add(@Valid @RequestBody Store store) {
		return storeRepository.save(store);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Store findOne(@PathVariable("id") int id) {
		return storeRepository.findOne(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Store update(@PathVariable("id") int id, @Valid @RequestBody Store store) {
		return storeRepository.save(store);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable("id") int id) {
		storeRepository.delete(id);
	}
}
