package flexjoy.newod.domain;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

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

	public Division() {}

	public Division(String name) {
		this.name = name;
	}
}
