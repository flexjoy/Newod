package flexjoy.newod.controller;

import flexjoy.newod.domain.City;
import flexjoy.newod.domain.Store;
import flexjoy.newod.repository.CityRepository;
import flexjoy.newod.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Sergey Cherepanov on 12.04.2016.
 */

@RestController
@RequestMapping("city/{city_id}/store")
public class StoreController {

	@Autowired
	private CityRepository cityRepository;

	@Autowired
	private StoreRepository storeRepository;

	@RequestMapping(method = RequestMethod.GET)
	public List<Store> findByCity(
			@PathVariable("city_id") int city_id) {
		City city = cityRepository.findOne(city_id);
		return storeRepository.findByCity(city);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Store add(
			@PathVariable("city_id") int city_id,
			@Valid @RequestBody Store store) {
		store.setCity(cityRepository.findOne(city_id));
		return storeRepository.save(store);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Store update(
			@PathVariable("city_id") int city_id,
			@PathVariable("id") int id,
			@Valid @RequestBody Store store) {
		store.setId(id);
		store.setCity(cityRepository.findOne(city_id));
		return storeRepository.save(store);
	}
}
