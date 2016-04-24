package flexjoy.newod.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Sergey Cherepanov on 01.04.2016
 */

@Entity
@Table(name = "division")
public class Division {

	@Id
	@GeneratedValue
	private int id;

	@NotEmpty
	@Length(min = 3, max = 45)
	private String name;

	private boolean enabled = true;

	@OneToMany(mappedBy = "division", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<City> cities;

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

	public Set<City> getCities() {
		return cities;
	}

	public void setCities(Set<City> cities) {
		this.cities = cities;
	}

	public Division() {}

	public Division(String name) {
		this.name = name;
	}
}
