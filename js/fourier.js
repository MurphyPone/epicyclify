function dft(x) {
    let X = [];             // results 
    const N = x.length;
    
    for (let k = 0; k < N; k++) {
        let re = 0;
        let im = 0;

        for (let n = 0; n < N; n++) {
            const φ = (TWO_PI * k * n) / N
            re += x[n] * cos(φ);
            im -= x[n] * sin(φ);
        }

        re = re / N;
        im = im / N;

        let freq  = k;
        let ampl  = sqrt(re * re + im * im);
        let phase = atan2(im, re);
        
        X[k] = { re, im, 
                 freq, ampl, phase };
    }
    return X;
}