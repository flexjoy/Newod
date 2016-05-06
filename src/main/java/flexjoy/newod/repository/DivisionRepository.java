package flexjoy.newod.repository;

import flexjoy.newod.domain.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

public interface DivisionRepository extends JpaRepository<Division, Integer>, JpaSpecificationExecutor {}
