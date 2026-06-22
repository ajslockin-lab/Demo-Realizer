import { Router, type IRouter } from "express";
import healthRouter from "./health";
import predictRouter from "./predict";
import lineupRouter from "./lineup";

const router: IRouter = Router();

router.use(healthRouter);
router.use(predictRouter);
router.use(lineupRouter);

export default router;
