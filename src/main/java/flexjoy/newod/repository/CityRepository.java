package flexjoy.newod.repository;

import flexjoy.newod.domain.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author Sergey Cherepanov on 01.05.2016.
 */

public interface CityRepository extends JpaRepository<City, Integer>, JpaSpecificationExecutor {}
