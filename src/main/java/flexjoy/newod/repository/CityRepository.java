package flexjoy.newod.repository;

import flexjoy.newod.domain.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sergey Cherepanov on 12.04.2016.
 */
@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

	List<City> findByDivision_id(Integer division_id);
}
