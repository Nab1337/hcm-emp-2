package com.infostudio.ba.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the OgOrganizations entity.
 */
public class OgOrganizationsDTO implements Serializable {

    private Long id;

    private String code;

    private String name;

    private String description;

    private String createdBy;

    private Instant createdAt;

    private String updatedBy;

    private Instant updatedAt;

    private Long idOrganizationTypeId;

    private Long idParentId;

    private Long idLegalEntityId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getIdOrganizationTypeId() {
        return idOrganizationTypeId;
    }

    public void setIdOrganizationTypeId(Long ogOrgTypesId) {
        this.idOrganizationTypeId = ogOrgTypesId;
    }

    public Long getIdParentId() {
        return idParentId;
    }

    public void setIdParentId(Long ogOrganizationsId) {
        this.idParentId = ogOrganizationsId;
    }

    public Long getIdLegalEntityId() {
        return idLegalEntityId;
    }

    public void setIdLegalEntityId(Long leLegalEntitiesId) {
        this.idLegalEntityId = leLegalEntitiesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OgOrganizationsDTO ogOrganizationsDTO = (OgOrganizationsDTO) o;
        if(ogOrganizationsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ogOrganizationsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OgOrganizationsDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedBy='" + getUpdatedBy() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
