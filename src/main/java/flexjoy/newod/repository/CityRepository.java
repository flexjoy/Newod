package flexjoy.newod.repository;

import flexjoy.newod.domain.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Sergey Cherepanov on 01.05.2016.
 */

public interface CityRepository extends JpaRepository<City, Integer> {

	Page<City> findByNameStartsWithIgnoreCase(@Param("name") String name, Pageable pageable);
}
