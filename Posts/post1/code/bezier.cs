using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class Bezier
{
    //polynomial Bezier implimentations
    public static Vector3 CubicSample(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4, float t)
    {
        float t2 = t * t;
        float t3 = t2 * t;
        float it = 1f - t;
        float it2 = it * it;
        float it3 = it * it2;

        return it3*p1 + 3*it2*t*p2 + 3*it*t2*p3 + t3*p4;
    }

    public static Vector3 QuadraticSample(Vector3 p1, Vector3 p2, Vector3 p3, float t)
    {
        float t2 = t * t;
        float it = 1f - t;
        float it2 = it * it;

        return it2*p1 + 2*it2*t*p2 + t2*p3;
    }

    public static Vector3 LinearSample(Vector3 p1, Vector3 p2, float t)
    {
        float it = 1f - t;

        return it*p1 + t*p2;
    }






    //polynomial Bezier derivative implimentations
    public static Vector3 Cubic1stDerivative(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4, float t)
    {
        float t2 = t * t;
        float it = 1f - t;
        float it2 = it * it;

        return 3*it2*(p2 - p1) + 6*it*t*(p3 - p2) + 3*t2*(p4 - p3);
    }

    public static Vector3 Quadratic1stDerivative(Vector3 p1, Vector3 p2, Vector3 p3, float t)
    {
        float it = 1f - t;

        return 2*it*(p2 - p1) + 2*t*(p3 - p2);
    }

    public static Vector3 Linear1stDerivative(Vector3 p1, Vector3 p2, float t)
    {
        return p2 - p1;
    }






    //polynomial Bezier 2nd derivative implimentations
    public static Vector3 Cubic2ndDerivative(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4, float t)
    {
        float it = 1f - t;

        return 6*it*(p3 - 2*p2 + p1) + 6*t*(p4 - 2*p3 + p2);
    }

    public static Vector3 Quadratic2ndDerivative(Vector3 p1, Vector3 p2, Vector3 p3, float t)
    {
        return 2*(p3 - 2*p2 + p1);
    }

    public static Vector3 Linear2ndDerivative(Vector3 p1, Vector3 p2, float t)
    {
        return Vector3.zero;
    }






    //get polynomial curves
    public static Vector3[] CubicCurve(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4, int detail)
    {
        Vector3[] points = new Vector3[detail+1];

        float step = 1f / detail;
        for (int i = 0; i <= detail; i++)
        {
            points[i] = CubicSample(p1,p2,p3,p4, step*i);
        }

        return points;
    }





    //cubic polynomail length estimate
    public static float CubicLength(Vector3 p1, Vector3 p2, Vector3 p3, Vector3 p4, int detail)
    {
        float dist = 0;

        Vector3 temp1 = p1;
        float step = 1f / detail;
        for (int i = 1; i <= detail; i++)
        {
            Vector3 temp2 = CubicSample(p1,p2,p3,p4, step*i);
            dist += (temp1 - temp2).magnitude;
            temp1 = temp2;
        }

        Debug.Log("Hello");

        return dist;
    }
}