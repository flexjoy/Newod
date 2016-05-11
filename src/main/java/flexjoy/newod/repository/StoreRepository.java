package flexjoy.newod.repository;

import flexjoy.newod.domain.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author Sergey Cherepanov on 11.05.2016.
 */

public interface StoreRepository extends JpaRepository<Store, Integer>, JpaSpecificationExecutor {}
