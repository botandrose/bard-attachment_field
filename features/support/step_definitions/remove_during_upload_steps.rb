Given "checksums are held" do
  page.execute_script(<<~JS)
    (() => {
      const origReadAsArrayBuffer = FileReader.prototype.readAsArrayBuffer;
      window._origReadAsArrayBuffer = origReadAsArrayBuffer;
      window._checksumGate = new Promise(resolve => { window._releaseChecksums = resolve; });
      FileReader.prototype.readAsArrayBuffer = function(...args) {
        window._checksumGate.then(() => origReadAsArrayBuffer.apply(this, args));
      };
    })();
  JS
end

When "checksums are released" do
  page.execute_script(<<~JS)
    FileReader.prototype.readAsArrayBuffer = window._origReadAsArrayBuffer;
    window._releaseChecksums();
  JS
  sleep 1
end
