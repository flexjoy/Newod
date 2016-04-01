package flexjoy.newod.controller;

import flexjoy.newod.domain.Division;
import flexjoy.newod.repository.DivisionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

@RestController
@RequestMapping("/divisions")
public class DivisionController {

    @Autowired
    private DivisionRepository repo;

    @RequestMapping(method = RequestMethod.GET)
    public List<Division> findAll() {
        return repo.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Division add(@Valid @RequestBody Division division) {
        return repo.save(division);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Division update(@PathVariable("id") int id, @Valid @RequestBody Division division) {
        division.setId(id);
        return repo.save(division);
    }
}
