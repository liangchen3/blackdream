package com.lite.blackdream.business.parameter.dynamicmodel;

import com.lite.blackdream.business.domain.DynamicProperty;
import com.lite.blackdream.framework.model.Request;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author LaineyC
 */
public class DynamicModelCreateRequest extends Request {

    private String name;

    private String nameCascadeScript;

    private Double nameViewWidth;

    private Map<String, Object> nameValidator = new LinkedHashMap<>();

    private String icon;

    private Boolean isRootChild;

    private List<DynamicProperty> properties = new ArrayList<>();

    private List<DynamicProperty> association = new ArrayList<>();

    private List<Map<String, Object>> predefinedAssociation = new ArrayList<>();

    private List<Long> children = new ArrayList<>();

    private Long generatorId;

    public DynamicModelCreateRequest(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameCascadeScript() {
        return nameCascadeScript;
    }

    public void setNameCascadeScript(String nameCascadeScript) {
        this.nameCascadeScript = nameCascadeScript;
    }

    public Double getNameViewWidth() {
        return nameViewWidth;
    }

    public void setNameViewWidth(Double nameViewWidth) {
        this.nameViewWidth = nameViewWidth;
    }

    public Map<String, Object> getNameValidator() {
        return nameValidator;
    }

    public void setNameValidator(Map<String, Object> nameValidator) {
        this.nameValidator = nameValidator;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Boolean getIsRootChild() {
        return isRootChild;
    }

    public void setIsRootChild(Boolean isRootChild) {
        this.isRootChild = isRootChild;
    }

    public List<DynamicProperty> getProperties() {
        return properties;
    }

    public void setProperties(List<DynamicProperty> properties) {
        this.properties = properties;
    }

    public List<DynamicProperty> getAssociation() {
        return association;
    }

    public void setAssociation(List<DynamicProperty> association) {
        this.association = association;
    }

    public List<Map<String, Object>> getPredefinedAssociation() {
        return predefinedAssociation;
    }

    public void setPredefinedAssociation(List<Map<String, Object>> predefinedAssociation) {
        this.predefinedAssociation = predefinedAssociation;
    }

    public List<Long> getChildren() {
        return children;
    }

    public void setChildren(List<Long> children) {
        this.children = children;
    }

    public Long getGeneratorId() {
        return generatorId;
    }

    public void setGeneratorId(Long generatorId) {
        this.generatorId = generatorId;
    }

}
