export default function getOpacity(x1,y1,x2,y2,x){
    return ((y1-y2)/(x1-x2))*x +(x1*y2-x2*y1)/(x1-x2)
}