package flexjoy.newod.repository;

import flexjoy.newod.domain.Division;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

public interface DivisionRepository extends JpaRepository<Division, Integer> {

	Page<Division> findByNameStartsWithIgnoreCase(@Param("name") String name, Pageable pageable);
}
