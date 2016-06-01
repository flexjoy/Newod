package flexjoy.newod.repository;

import flexjoy.newod.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author Sergey Cherepanov on 11.05.2016.
 */

public interface StoreRepository extends JpaRepository<Store, Integer>, JpaSpecificationExecutor {

	@Query("select s from Store s where s.city.id = :id order by s.name")
	List<Store> findByCityId(@Param("id") int id);
}
