import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/features/mongodb/mongodbconnection'
import { Group, User } from '@/features/mongodb/models'
import { checkParams } from '../apihelpers'

interface SimpleTimeInterval {
  start: number
  end: number
}

// Handler function for the /api/users endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const group_info = req.query

  // check query parameters
  const param_res = checkParams(['groupId'], group_info)
  if (param_res.statusCode === 400) {
    res.status(param_res.statusCode).json(param_res.error)
    return
  }

  const group = await Group.findById(group_info.groupId)
  const timesData = group.time_sets;

  const stimesets: SimpleTimeInterval[][] = []

  for (let timeset of timesData) {
    const wow = timeset.times
      .sort((a: any, b: any) => {
        const aStartTime = new Date(a.startDatetime).getTime()
        const bStartTime = new Date(b.startDatetime).getTime()
        return aStartTime - bStartTime
      })
      .map((a: any) => {
        return {
          start: new Date(a.startDatetime).getTime(),
          end: new Date(a.endDatetime).getTime(),
        }
      })

    const han: SimpleTimeInterval[] = []
    // merge the intervals
    let current_int: SimpleTimeInterval | null = null
    for (let i = 0; i < wow.length; i++) {
      if (current_int === null) {
        current_int = wow[i]
        continue
      }

      if (current_int.end >= wow[i].start) {
        current_int = { start: current_int.start, end: wow[i].end }
      } else {
        han.push(current_int)
        current_int = wow[i]
      }
    }

    stimesets.push(han)
  }

  let working_set: SimpleTimeInterval[] = []
  let first = true
  for (let timeset of stimesets) {
    console.log('WROKING SET')
    console.log(working_set)
    // first
    if (first) {
      working_set = timeset
      first = false
      continue
    }

    const next_timeset: SimpleTimeInterval[] = []

    for (let i = 0; i < working_set.length; i++) {
      let interval = working_set[i]

      for (let j = 0; j < timeset.length; j++) {
        const tinterval = timeset[j]
        const start = Math.max(tinterval.start, interval.start)
        const end = Math.min(tinterval.end, interval.end)
        if (start < end) {
          next_timeset.push({ start: start, end: end })
        }
      }
    }
    console.log(next_timeset)
    working_set = next_timeset
  }

  const fin_data = working_set.map((m) => {
    return { startDatetime: new Date(m.start).toISOString(), endDatetime: new Date(m.end).toISOString()}
  })

  res.status(200).json(fin_data)
}
