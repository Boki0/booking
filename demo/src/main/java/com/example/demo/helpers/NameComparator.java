package com.example.demo.helpers;

import java.util.Comparator;

public class NameComparator implements Comparator<String> {

    @Override
    public int compare(String o1, String o2) {
        int first = Integer.parseInt(o1.substring(0, o1.indexOf('.')));
        int second = Integer.parseInt(o2.substring(0, o2.indexOf('.')));

        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
    }
}
