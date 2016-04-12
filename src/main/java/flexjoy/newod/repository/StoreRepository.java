package flexjoy.newod.repository;

import flexjoy.newod.domain.City;
import flexjoy.newod.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Sergey Cherepanov on 12.04.2016.
 */

public interface StoreRepository extends JpaRepository<Store, Integer> {

	List<Store> findByCity(City city);
}
