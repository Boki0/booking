package com.example.demo.exception;

public class ResourceConflictException extends RuntimeException {
    private static final long serialVersionUID = 1791564636123821405L;

//    private Integer resourceId;

    public ResourceConflictException(String message) {
        super(message);
//        this.setResourceId(resourceId);
    }

//    public Integer getResourceId() {
//        return resourceId;
//    }

//    public void setResourceId(Integer resourceId) {
//        this.resourceId = resourceId;
//    }

}
