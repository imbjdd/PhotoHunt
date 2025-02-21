'use client';

import { supabase } from "@/lib/supabaseClient";

import { useEffect, useState } from 'react';
import { List, Card, Cell, Chip, Section } from '@telegram-apps/telegram-ui';
import * as React from 'react'

export default function Posts() {
  const [posts, setPosts] = useState([])

  async function getData() {
    const { data: users, error } = await supabase.from("post").select("*");
    setPosts(users as any)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="pb-20">
      <List>
      <Section header="Posts">
          {posts.map((user:any, i:number) => (
            <Cell key={i}>
              <Card>
                <div className="absolute right-0">
                <Chip className="absolute right-0" readOnly>
                  +4
                </Chip>
                </div>
                <React.Fragment key=".0">
                  <img
                    alt="Dog"
                    src={process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL+'/ipfs/'+user.cid_ipfs}
                    style={{
                      display: 'block',
                      height: 308,
                      objectFit: 'cover',
                      width: 254
                    }}
                  />
                <Cell
                  subtitle="Yesterday"
                >
                  Noah
                </Cell>
                </React.Fragment>
              </Card>
            </Cell>
          ))}
      </Section>
      </List>
    </div>
  );
};
