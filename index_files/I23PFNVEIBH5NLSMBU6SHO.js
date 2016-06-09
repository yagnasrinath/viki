(function () {
  var scheme = (("https:" == document.location.protocol) ? "https" : "http");
  var adnxs_domain = 'secure.adnxs.com';
  var aol_domain = 'secure.leadback.advertising.com';
  var rule = ["*", "*"];
  if (scheme=='http') { adnxs_domain = 'ib.adnxs.com'; aol_domain = 'leadback.advertising.com';}
  var el = document.createElement("div");
  el.style["width"] = "1px";
  el.style["height"] = "1px";
  el.style["display"] = "inline";
  el.style["position"] = "absolute";
  var content = unescape('%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/r/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/f/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/b/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/w/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/x/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/l/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/o/out%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//d.adroll.com/cm/g/out%3fgoogle_nid%3dadroll5%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//googleads.g.doubleclick.net/pagead/viewthroughconversion/0/%3flabel%3dnull%26amp%3bguid%3dON%26amp%3bscript%3d0%26amp%3bord%3d%5bord%5d%22/%3e%0a%3cimg%20src%3d%22%5bprotocol%5d%3a//%5badnxs_domain%5d/seg%3fadd%3d4703997%26t%3d2%22%20width%3d%221%22%20height%3d%221%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//googleads.g.doubleclick.net/pagead/viewthroughconversion/0/%3flabel%3dnull%26amp%3bguid%3dON%26amp%3bscript%3d0%26amp%3bord%3d%5bord%5d%22/%3e%0a%3cimg%20src%3d%22%5bprotocol%5d%3a//%5badnxs_domain%5d/seg%3fadd%3d5037106%26t%3d2%22%20width%3d%221%22%20height%3d%221%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//googleads.g.doubleclick.net/pagead/viewthroughconversion/0/%3flabel%3dnull%26amp%3bguid%3dON%26amp%3bscript%3d0%26amp%3bord%3d%5bord%5d%22/%3e%0a%3cimg%20src%3d%22%5bprotocol%5d%3a//%5badnxs_domain%5d/seg%3fadd%3d4907820%26t%3d2%22%20width%3d%221%22%20height%3d%221%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//googleads.g.doubleclick.net/pagead/viewthroughconversion/0/%3flabel%3dnull%26amp%3bguid%3dON%26amp%3bscript%3d0%26amp%3bord%3d%5bord%5d%22/%3e%0a%3cimg%20src%3d%22%5bprotocol%5d%3a//%5badnxs_domain%5d/seg%3fadd%3d4907813%26t%3d2%22%20width%3d%221%22%20height%3d%221%22/%3e%0a%3cimg%20height%3d%221%22%20width%3d%221%22%20style%3d%22border-style%3anone%3b%22%20alt%3d%22%22%20src%3d%22%5bprotocol%5d%3a//googleads.g.doubleclick.net/pagead/viewthroughconversion/0/%3flabel%3dnull%26amp%3bguid%3dON%26amp%3bscript%3d0%26amp%3bord%3d%5bord%5d%22/%3e%0a%3cimg%20src%3d%22%5bprotocol%5d%3a//%5badnxs_domain%5d/seg%3fadd%3d0%26t%3d2%22%20width%3d%221%22%20height%3d%221%22/%3e%0a');
  

  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','//connect.facebook.net/en_US/fbevents.hashing.js');

  try {
  
(function() {
var rtb = document.createElement("div");
rtb.style["width"] = "1px";
rtb.style["height"] = "1px";
rtb.style["display"] = "inline";
rtb.style["position"] = "absolute";
rtb.innerHTML = "<img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\"src=\"https://d.adroll.com/cm/index/out\"/><img height=\"1\" width=\"1\" style=\"border-style:none;\" alt=\"\"src=\"https://d.adroll.com/cm/n/out\"/>";
__adroll._head().appendChild(rtb);
})();
if(typeof __adroll.fb === 'undefined'){
        fbq('init', '798273686975614');
    __adroll.fb=true;
    fbq('track', "PageView", {segment_eid: ["HYZ4MZZO3BBLBPYO2Q4MBJ","DI6ZP34UMNGJRGRUO6HEP6","FDELXWRY6RCLBEAWNYYZC6","72DBANWHCFFXVARR7SICWW","CHHUHR7QHNBBPNQKLHCN5L"]});
} else {
    fbq('track', "CustomEvent", {event: "EventSegment", segment_eid: ["HYZ4MZZO3BBLBPYO2Q4MBJ","DI6ZP34UMNGJRGRUO6HEP6","FDELXWRY6RCLBEAWNYYZC6","72DBANWHCFFXVARR7SICWW","CHHUHR7QHNBBPNQKLHCN5L"]});
}


  } catch(e) {}


  var r = Math.random()*10000000000000000;
  content = content.replace(/\[ord\]/gi, r);
  content = content.replace(/\[protocol\]/gi, scheme);
  content = content.replace(/\[adnxs_domain\]/gi, adnxs_domain);
  content = content.replace(/\[aol_domain\]/gi, aol_domain);
  content = __adroll.replace_external_data(content);
  el.innerHTML = content;
  __adroll._head().appendChild(el);
  if (typeof __adroll.set_pixel_cookie != 'undefined') {__adroll.set_pixel_cookie(adroll_adv_id, adroll_pix_id, "HYZ4MZZO3BBLBPYO2Q4MBJ");}
}());
