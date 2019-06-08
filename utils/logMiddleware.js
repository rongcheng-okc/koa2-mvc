module.exports = async (ctx, next) => {
  const start = Date.now();
  console.log(`[RC] ${start} request method ${ctx.method}, url ${ctx.url}`);
  await next();
  const distance = Date.now() - start;
  console.log(`[RC] const ${distance} ms request method ${ctx.method}, url ${ctx.url}`);
}