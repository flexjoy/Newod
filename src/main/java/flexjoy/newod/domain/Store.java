package flexjoy.newod.domain;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * @author Sergey Cherepanov on 12.04.2016.
 */

@Entity
@Table(name = "store")
public class Store {

	@Id
	@GeneratedValue
	private int id;

	@NotBlank
	@Length(min = 3, max = 45)
	private String name;

	private boolean enabled = true;

	@ManyToOne
	@JoinColumn(name = "city_id", nullable = false)
	private City city;

	@Length(max = 150)
	private String address;

	private Date opendate;

	private Date closedate;

	@Length(max = 255)
	private String note;

	@ManyToMany(cascade = CascadeType.ALL)
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

	public void setName(String name) {
		this.name = name;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getOpendate() {
		return opendate;
	}

	public void setOpendate(Date opendate) {
		this.opendate = opendate;
	}

	public Date getClosedate() {
		return closedate;
	}

	public void setClosedate(Date closedate) {
		this.closedate = closedate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Set<Phone> getPhones() {
		return phones;
	}

	public void setPhones(Set<Phone> phones) {
		this.phones = phones;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}
}
