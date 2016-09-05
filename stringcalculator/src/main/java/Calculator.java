/**
 * @author darques
 */
public class Calculator {

    private int minValue;
    private int maxValue;

    public Calculator(int minValue, int maxValue) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    public int add(int arg1, int arg2) {
        return arg1 + arg2;
    }

    public int substract(int arg1, int arg2) {
        return arg1 - arg2;
    }
}
