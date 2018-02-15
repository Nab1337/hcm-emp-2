package com.infostudio.ba.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A EmEmpSalaries.
 */
@Entity
@Table(name = "em_emp_salaries")
public class EmEmpSalaries implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date_from", nullable = false)
    private Instant dateFrom;

    @NotNull
    @Column(name = "date_to", nullable = false)
    private Instant dateTo;

    @Column(name = "salary_amount")
    private Double salaryAmount;

    @Column(name = "salary_coefficient")
    private Double salaryCoefficient;

    @Column(name = "work_history_coefficient")
    private Double workHistoryCoefficient;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToOne
    @JoinColumn(name = "ID_EMPLOYEE")
    private EmEmployees idEmployee;

    @OneToOne
    @JoinColumn(name = "ID_CONTRACT_TYPE")
    private EmContractTypes idContractType;

    @OneToOne
    @JoinColumn(name = "ID_WORK_PLACE")
    private OgWorkPlaces idWorkPlace;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateFrom() {
        return dateFrom;
    }

    public EmEmpSalaries dateFrom(Instant dateFrom) {
        this.dateFrom = dateFrom;
        return this;
    }

    public void setDateFrom(Instant dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Instant getDateTo() {
        return dateTo;
    }

    public EmEmpSalaries dateTo(Instant dateTo) {
        this.dateTo = dateTo;
        return this;
    }

    public void setDateTo(Instant dateTo) {
        this.dateTo = dateTo;
    }

    public Double getSalaryAmount() {
        return salaryAmount;
    }

    public EmEmpSalaries salaryAmount(Double salaryAmount) {
        this.salaryAmount = salaryAmount;
        return this;
    }

    public void setSalaryAmount(Double salaryAmount) {
        this.salaryAmount = salaryAmount;
    }

    public Double getSalaryCoefficient() {
        return salaryCoefficient;
    }

    public EmEmpSalaries salaryCoefficient(Double salaryCoefficient) {
        this.salaryCoefficient = salaryCoefficient;
        return this;
    }

    public void setSalaryCoefficient(Double salaryCoefficient) {
        this.salaryCoefficient = salaryCoefficient;
    }

    public Double getWorkHistoryCoefficient() {
        return workHistoryCoefficient;
    }

    public EmEmpSalaries workHistoryCoefficient(Double workHistoryCoefficient) {
        this.workHistoryCoefficient = workHistoryCoefficient;
        return this;
    }

    public void setWorkHistoryCoefficient(Double workHistoryCoefficient) {
        this.workHistoryCoefficient = workHistoryCoefficient;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EmEmpSalaries createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public EmEmpSalaries createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public EmEmpSalaries updatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
        return this;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public EmEmpSalaries updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public EmEmployees getIdEmployee() {
        return idEmployee;
    }

    public EmEmpSalaries idEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
        return this;
    }

    public void setIdEmployee(EmEmployees emEmployees) {
        this.idEmployee = emEmployees;
    }

    public EmContractTypes getIdContractType() {
        return idContractType;
    }

    public EmEmpSalaries idContractType(EmContractTypes emContractTypes) {
        this.idContractType = emContractTypes;
        return this;
    }

    public void setIdContractType(EmContractTypes emContractTypes) {
        this.idContractType = emContractTypes;
    }

    public OgWorkPlaces getIdWorkPlace() {
        return idWorkPlace;
    }

    public EmEmpSalaries idWorkPlace(OgWorkPlaces ogWorkPlaces) {
        this.idWorkPlace = ogWorkPlaces;
        return this;
    }

    public void setIdWorkPlace(OgWorkPlaces ogWorkPlaces) {
        this.idWorkPlace = ogWorkPlaces;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        EmEmpSalaries emEmpSalaries = (EmEmpSalaries) o;
        if (emEmpSalaries.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emEmpSalaries.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmEmpSalaries{" +
            "id=" + getId() +
            ", dateFrom='" + getDateFrom() + "'" +
            ", dateTo='" + getDateTo() + "'" +
            ", salaryAmount=" + getSalaryAmount() +
            ", salaryCoefficient=" + getSalaryCoefficient() +
            ", workHistoryCoefficient=" + getWorkHistoryCoefficient() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
