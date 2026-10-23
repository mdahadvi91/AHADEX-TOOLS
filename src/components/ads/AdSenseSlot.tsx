import { useEffect, useRef, useState } from "react";
import { subscribeToConsent } from "@lib/consent";                                        

declare global {
  interface Window {                                                             
    adsbygoogle?: unknown[];                                                   
  }                                                                          
}

interface AdSenseSlotProps {
  slot?: string; // e.g. "1234567890" (Numeric ID)                       
  label?: string;                                                            
}

export function AdSenseSlot({ slot = "1234567890", label }: AdSenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null);                                  
  const [hasAdsConsent, setHasAdsConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // 1. Check Consent                                                          
  useEffect(() => {                                                              
    const unsubscribe = subscribeToConsent((state) => {                            
      setHasAdsConsent(!!state?.ads);                                            
    });                                                                          
    return unsubscribe;                                                        
  }, []);                                                                   

  // 2. Check if AdSense script is already loaded (it is added in index.html)
  useEffect(() => {
    if (window.adsbygoogle) {
      setScriptLoaded(true);
      return;
    }
    // Fallback if script is not loaded (e.g., strict adblock or delayed load)
    const interval = setInterval(() => {
      if (window.adsbygoogle) {
        setScriptLoaded(true);
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // 3. Lazy Load Ad only when visible and consent is given                                       
  useEffect(() => {                                                              
    if (!hasAdsConsent || !adRef.current || !scriptLoaded) return;                                                                                                             
    const observer = new IntersectionObserver(                                     
      (entries) => {                                                                 
        if (entries[0].isIntersecting) {                                               
          setIsVisible(true);                                                          
          observer.disconnect();                                                     
        }                                                                          
      },                                                                           
      { rootMargin: "200px" }                                                    
    );                                                                       
    observer.observe(adRef.current);                                             
    return () => observer.disconnect();                                        
  }, [hasAdsConsent, scriptLoaded]);                                                                                                                        

  // 4. Push Ad to AdSense
  useEffect(() => {
    if (isVisible && hasAdsConsent && window.adsbygoogle) {                                              
      try {                                                                          
        (window.adsbygoogle = window.adsbygoogle || []).push({});                  
      } catch (e) {                                                                  
        console.error("AdSense push error:", e);                                   
      }
    }
  }, [isVisible, hasAdsConsent]);                                                                           

  // If user hasn't consented to ads, show nothing
  if (!hasAdsConsent) return null;
                                                                               
  return (
    <div className="my-6 flex flex-col items-center justify-center min-h-[100px] bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">         
      {label && <span className="text-[9px] uppercase tracking-widest text-gray-400 mb-1 opacity-50">{label}</span>}                                                                                                                                                              
      {/* AdSense Ad Unit */}                                                      
      <ins
        ref={adRef}                                                                  
        className="adsbygoogle"                                                      
        style={{ display: "block", width: "100%", minHeight: "90px" }}               
        data-ad-client="ca-pub-5216241068377334"                                     
        data-ad-slot={slot}                                                          
        data-ad-format="auto"
        data-full-width-responsive="true"                                          
      />                                                                         
    </div>                                                                     
  );                                                                         
}
