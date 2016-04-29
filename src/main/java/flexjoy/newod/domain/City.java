package flexjoy.newod.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Sergey Cherepanov on 12.04.2016.
 */

@Entity
@Table(name = "city")
public class City {

	@Id
	@GeneratedValue
	private int id;

	@NotBlank
	@Length(min = 3, max = 45)
	private String name;

	private boolean enabled = true;

	@ManyToOne
	@JoinColumn(name = "division_id", nullable = false)
	private Division division;

	@OneToMany(mappedBy = "city", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Store> stores;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Division getDivision() {
		return division;
	}

	public void setDivision(Division division) {
		this.division = division;
	}

	public Set<Store> getStores() {
		return stores;
	}

	public void setStores(Set<Store> stores) {
		this.stores = stores;
	}
}
