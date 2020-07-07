public with sharing class Utils {
    public Utils() {

    }
    @AuraEnabled(cacheable=true)
    public static String getFooStr() {
        return 'foo';
    }
}
