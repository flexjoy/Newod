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
@Table(name = "phone")
public class Phone {

	@Id
	@GeneratedValue
	private int id;

	@NotBlank
	@Length(min = 3, max = 20)
	private String number;

	@Length(max = 255)
	private String note;

	@ManyToOne
	@JoinColumn(name = "phonetype_id", nullable = false)
	private PhoneType type;

	@ManyToMany(mappedBy = "phones")
	@JsonIgnore
	private Set<Store> stores;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public PhoneType getType() {
		return type;
	}

	public void setType(PhoneType type) {
		this.type = type;
	}

	public Set<Store> getStores() {
		return stores;
	}

	public void setStores(Set<Store> stores) {
		this.stores = stores;
	}
}
