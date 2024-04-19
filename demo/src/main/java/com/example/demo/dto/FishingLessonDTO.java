package com.example.demo.dto;

import com.example.demo.model.FishingLesson;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FishingLessonDTO extends OfferDTO{

    private Set<String> fishingEquipment;

    public FishingLessonDTO(FishingLesson fishingLesson) {
        super(fishingLesson);
        fishingEquipment = fishingLesson.getFishingEquipment();
    }
}
