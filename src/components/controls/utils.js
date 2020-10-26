const buildData = (length) => {
    let count = 0

    return {
      next: function() {
          const done = count >= length;

          //count = count + 1;
          return {
            value: {"name":"Lafayette (LAFY)", "radius":0.1,"position":[0., 0., 0,], "id": count++},
            done
          }
      },
      [Symbol.iterator]: function() { return this; }
    };
}

export { buildData };