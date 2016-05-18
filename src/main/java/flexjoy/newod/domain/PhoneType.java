package flexjoy.newod.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Set;

/**
 * @author Sergey Cherepanov on 18.05.2016.
 */

@Entity
@Table(name = "phonetype")
public class PhoneType {

	@Id
	@GeneratedValue
	private int id;

	@NotBlank
	@Length(min = 3, max = 20)
	private String name;

	@NotBlank
	@Length(min = 3, max = 20)
	private String mask;

	@OneToMany(mappedBy = "type", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Phone> phones;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setTypeName(String name) {
		this.name = name;
	}

	public String getMask() {
		return mask;
	}

	public void setMask(String mask) {
		this.mask = mask;
	}

	public Set<Phone> getPhones() {
		return phones;
	}

	public void setPhones(Set<Phone> phones) {
		this.phones = phones;
	}
}
