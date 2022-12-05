declare module 'react-slideshow-image'{
    export class Zoom extends React.Component<ZoomProps & any, any>{
        goBack():void;
        goNext():void;
        goTo(index:number):void;
    }
 
    export class Fade extends React.Component<SlideShowProps & any, any>{
        goBack():void;
        goNext():void;
        goTo(index:number):void;
    }
 
    export class Slide extends React.Component<SlideShowProps & any, any>{
        goBack():void;
        goNext():void;
        goTo(index:number):void;
    }
 
    export interface SlideShowProps{
        duration?:number,
        transitionDuration?:number,
        defaultIndex?:number,
        indicators?:boolean | function,
        prevArrow?:object | function,
        nextArrow?:object | function,
        arrows?:boolean,
        autoplay?:boolean,
        infinite?:boolean,
        onChange?(oldIndex:number, newIndex:number):void,
        pauseOnHover?:boolean,
        slidesToShow?:boolean,
        slidesToScroll?:number,
        canSwipe?:boolean,
        easing?:string,
        cssClass?:string
 
    }
 
    export interface ZoomProps  extends SlideShowProps{
        scale:number
    }
    
}