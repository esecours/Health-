import React, { useEffect } from 'react';

const POST_URLS = [
  "https://www.facebook.com/100081666974574/posts/1024737403591816/",
  "https://www.facebook.com/100081666974574/posts/1023586420373581/",
  "https://www.facebook.com/100081666974574/posts/1022730967125793/",
  "https://www.facebook.com/100081666974574/posts/1021217387277151/",
  "https://www.facebook.com/100081666974574/posts/1020409160691307/",
  "https://www.facebook.com/100081666974574/posts/1019957020736521/",
  "https://www.facebook.com/100081666974574/posts/1019335477465342/",
  "https://www.facebook.com/100081666974574/posts/1011729731559250/",
  "https://www.facebook.com/100081666974574/posts/1010959938302896/",
  "https://www.facebook.com/100081666974574/posts/1007850991947124/"
];

export const FacebookFeedSection: React.FC = () => {
  useEffect(() => {
    // Load Facebook SDK
    const scriptId = 'facebook-jssdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v15.0";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if ((window as any).FB) {
          (window as any).FB.XFBML.parse();
        }
      };
      document.body.appendChild(script);
    } else {
      // If already loaded, re-parse
      if ((window as any).FB && (window as any).FB.XFBML) {
        (window as any).FB.XFBML.parse();
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-slate-900 font-display">Dernières actualités Facebook</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {POST_URLS.map((url, index) => (
          <div key={index} className="flex justify-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div 
              className="fb-post" 
              data-href={url} 
              data-width="500" 
              data-show-text="true"
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
